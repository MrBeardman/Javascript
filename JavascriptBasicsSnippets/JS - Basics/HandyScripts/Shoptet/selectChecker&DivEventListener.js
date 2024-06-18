
document.querySelectorAll(".detail-parameters select").forEach(selectElement => {
    selectElement.addEventListener("change", function() {
      console.log("The select element has changed.");
      const selectedOption = this.options[this.selectedIndex];
      console.log("Selected option:", selectedOption);
      if (selectedOption.classList.contains("unavailable-option")) {
        console.log("Selected option is unavailable.");
        return;
      }
      const messagesDiv = document.querySelector(".messages");
      console.log("Messages div:", messagesDiv);
      const observer = new MutationObserver(mutations => {
        console.log("Mutation observer fired.");
        mutations.forEach(mutation => {
          console.log("Mutation:", mutation);
          mutation.addedNodes.forEach(addedNode => {
            console.log("Added node:", addedNode);
            if (addedNode.nodeName === "DIV") {
              console.log("Removing added node.");
              addedNode.remove();
              observer.disconnect();
            }
          });
        });
      });
      observer.observe(messagesDiv, { childList: true });
    });
  });