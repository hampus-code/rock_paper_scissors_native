export function getTime() {
  return fetch("http://worldtimeapi.org/api/ip")
    .then((response) => {
      console.log("Response" + response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
