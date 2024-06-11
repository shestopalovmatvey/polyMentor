import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

export let errorRate = new Rate("errors");

export let options = {
  stages: [
    { duration: "1m", target: 5000 },
    { duration: "1m", target: 10000 },
    { duration: "1m", target: 15000 },
    { duration: "1m", target: 10000 },
    { duration: "1m", target: 5000 },
    { duration: "30s", target: 1000 },
  ],
  thresholds: {
    errors: ["rate<0.02"],
    http_req_duration: ["p(95)<300"],
  },
};

export default function () {
  let department = "Институт компьютерных наук и кибербезопасности";
  let encodedDepartment = encodeURIComponent(department);
  console.log(`Requesting department: ${department}`);
  let res = http.get(
    `http://localhost:5000/api/getAllByDepartment?department=${encodedDepartment}`
  );

  console.log(`Status: ${res.status}`);
  console.log("Response body:", res.body);

  let result = check(res, {
    "is status 200": (r) => r.status === 200,
    "is response time < 500ms": (r) => r.timings.duration < 500,
  });

  if (!result) {
    console.log(`Request failed: ${JSON.stringify(res)}`);
  }

  errorRate.add(!result);
  sleep(1);
}
