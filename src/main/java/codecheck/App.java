package codecheck;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class App {
	public static void main(String[] args) {
		String subcommand = args[0];
		String input = args[1];

		String value = "";
		switch (subcommand) {
		case "encode":
			value = encode(input);
			break;
		case "decode":
			value = decode(input).toString();
			break;
		case "align":
			value = align(input);
			break;
		}
		System.out.println(value);
	}

	private static List<String> table = new ArrayList<String>(Arrays.asList("A", "B", "C", "D", "E", "F", "G", "H", "I"));
	private static BigDecimal scale = BigDecimal.valueOf(table.size());

	private static String encode(String input) {
		BigDecimal bg = new BigDecimal(input);
		List<BigDecimal> list = new ArrayList<BigDecimal>();
		while (true) {
			list.add(bg.remainder(scale));
			BigDecimal divided = bg.divide(scale, 0, BigDecimal.ROUND_DOWN);
			if (divided.compareTo(BigDecimal.ZERO) == 0) {
				break;
			} else {
				bg = divided;
			}
		}

		StringBuilder sb = new StringBuilder();
		for (int i = list.size(); 0 < i; i--) {
			sb.append(table.get(list.get(i - 1).intValue()));
		}
		return sb.toString();
	}

	private static BigDecimal decode(String input) {
		String[] array = input.split("");
		List<Integer> list = new ArrayList<Integer>();
		for (String ch: array) {
			list.add(new Integer(table.indexOf(ch)));
		}

		BigDecimal result = BigDecimal.valueOf(0);
		for (int i = 0; i < list.size(); i++) {
			BigDecimal param1 = BigDecimal.valueOf(list.get(list.size() - i - 1));
			BigDecimal param2 = BigDecimal.valueOf(9).pow(i);
			result = result.add(param1.multiply(param2));
		}
		return result;
	}

	private static String align(String input) {
		// 右辺の算出
		int count = input.length();
		if (input.startsWith("I")) {
			count++;
		}
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < count; i++) {
			sb.append("H");
		}
		String result = sb.toString();
		BigDecimal decodedResult = decode(result);

		// 左辺の算出
		BigDecimal decodedInput = decode(input);
		BigDecimal diff = decodedResult.subtract(decodedInput);
		String left = input + " + " + encode(diff.toString());

		return left + " = " + result.toString();
	}
}
