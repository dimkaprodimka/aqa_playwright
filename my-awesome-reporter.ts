import type {
    FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
  } from '@playwright/test/reporter';
  
  class MyReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite) {
      console.log(`Starting the run with ${suite.allTests().length} tests`);
    }
  
    passed = 0
    failed = 0
    skipped = 0
    onTestEnd(test: TestCase, result: TestResult) {
      console.log(`${test.title}: ${result.status}`);
      if (result.status == 'passed') {
        this.passed = this.passed + 1
      }
      if (result.status == 'failed') {
        this.failed = this.failed + 1
      }
      if (result.status == 'skipped') {
        this.skipped = this.skipped +1
      }
    }
  
    onEnd(result: FullResult) {
      console.log(`Test run status: ${result.status}`);
      console.log(`Amount of passed tests: ${this.passed}`);
      console.log(`Amount of failed tests: ${this.failed}`);
      console.log(`Amount of skipped tests: ${this.skipped}`);
      console.log(`Start time: ${result.startTime.toTimeString().split(' ')[0]}`);
      console.log(`Test run duration in seconds: ${result.duration/1000}`);
    }
  }
  
  export default MyReporter;