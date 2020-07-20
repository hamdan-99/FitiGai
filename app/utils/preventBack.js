function noBack() {
  console.log("I hate even back word :P");
}

window.onbeforeunload = function () {
  if (window.history.back()) {
    [
      Router.reload(window.location.pathname),
      "I hate even back word :P",
      noBack,
    ];
  }
};

export default function NoBack() {
  return null;
}
