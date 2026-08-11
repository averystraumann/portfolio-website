const tabs = document.querySelector(".tabs-inner");

const [tabsHeader, ...tabsContent] = tabs.children;

let activeTab = tabsHeader.children[0];
let activeContent = tabsContent[0];

const activeTabIndicator = document.createElement("span");
activeTabIndicator.className = "active-tab-indicator";

tabsHeader.appendChild(activeTabIndicator);

const activateTab = (tab, i) => {
  activeTab.setAttribute("aria-selected", "false");
  tab.setAttribute("aria-selected", "true");
  activeTab = tab;

  activeContent.setAttribute("hidden", "true");
  tabsContent[i].removeAttribute("hidden");
  activeContent = tabsContent[i];

  // activeTab.focus();
};

activateTab(activeTab, 0);

[...tabsHeader.children].forEach((tab, i) => {
  tab.addEventListener("click", () => activateTab(tab, i));
});
