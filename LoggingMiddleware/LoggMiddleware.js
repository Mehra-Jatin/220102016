import axios from "axios";


async function Log(stack, level, packagename, message) {
  try {


    const response = await axios.post("http://20.244.56.144/evaluation-service/logs", {
      stack,
      level,
      package: packagename,
      message,
    }, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Log sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to send log:", error.message);
  }
}

export default Log;
