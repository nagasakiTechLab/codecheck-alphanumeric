"use strict";
// TODO: split tests into separate expects
// TODO: add expect output to be ok expectation in align サブコマンド to preven unelegant failure
const expect = require("chai").expect;
const codecheck = require("codecheck");
const app = codecheck.consoleApp(process.env.APP_COMMAND);
const testcases = require("./basic_testcases.json");

describe("CLIアプリの", () => {
  describe("decodeサブコマンドは", () => {
    testcases["decode"].forEach((testcase) => {
      it(testcase.title, () => {
        return app.codecheck(testcase.input).then( result => {
          expect(result.code).to.equal(0,
              "Error: CLIアプリケーションはステータスコード0で終了しなければなりません。\n" +
              "Error: CLI App should end with status code 0.");
          let n = parseInt(result.stdout[0]);
          expect(n).not.to.be.NaN;
          expect(n).to.equal(testcase.output,
              "Error: 期待した10進法の数値が出力されていません。\n" +
              "Error: the expected decimal number was not returned.");
        });
      });
    });
  });

  describe("encode サブコマンドは", () => {
    it("A~Iの間のアルファベットで構成されるアルファベットを出力する", () => {
      return app.codecheck(["encode", "11"]).then( result => {
        expect(result.code).to.equal(0,
            "Error: CLIアプリケーションはステータスコード0で終了しなければなりません。\n" +
            "Error: CLI App should end with status code 0.");
        expect(result.stdout[0]).to.match(/[A-I]/,
            "Error: 出力がA~Iの間のアルファベットで構成されていません。\n" +
            "Error: The output should consist of only alphabetical characters A~I");
      });
    });
    testcases["encode"].forEach((testcase) => {
      it(testcase.title, () => {
        return app.codecheck(testcase.input).then( result => {
          expect(result.code).to.equal(0,
              "Error: CLIアプリケーションはステータスコード0で終了しなければなりません。\n" +
              "Error: CLI App should end with status code 0.");
          expect(result.stdout[0]).to.equal(testcase.output,
              "Error: 期待した「アルファベット数字」が出力されていません。\n" +
              "Error: the expected 'alphabetical number' was not returned.");
        });
      });
    });
  });

  describe("align サブコマンドは", () => {
    testcases["align"].forEach((testcase) => {
      it(testcase.title, () => {
        return app.codecheck(testcase.input).then( result => {
          expect(result.code).to.equal(0,
              "Error: CLIアプリケーションはステータスコード0で終了しなければなりません。\n" +
              "Error: CLI App should end with status code 0.");
          expect(result.stdout[0]).to.not.be.empty;
          let tokens = result.stdout[0].split(" = ")
          let a = tokens[0].split(" + ")[0];
          let b = tokens[0].split(" + ")[1];
          let c = tokens[1];

          expect(a).to.match(/[A-I]/,
              "Error: 出力した数式の第1項がA~Iの間のアルファベットで構成されていません。\n" +
              "Error: The first operand should consist of only alphabetical characters A~I");
          expect(b).to.match(/[A-I]/,
              "Error: 出力した数式の第2項がA~Iの間のアルファベットで構成されていません。\n" +
              "Error: The second operand should consist of only alphabetical characters A~I");
          expect(c).to.match(/[H]/,
              "Error: 出力した数式の和がHのみで構成されていません。\n" +
              "Error: The result sum should consist of only 'H's");
          expect(result.stdout[0]).to.equal(testcase.output,
              "Error: 出力した数式が期待した数式と完全一致していません。\n" +
              "Error: The output result does not perfectly match with the expected equation.");
        });
      });
    });
  });
});
