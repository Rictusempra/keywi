browser.contextMenus.create({
    id: "username-and-password",
    title: "Fill username and password",
    contexts: ["editable"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "username-and-password") {
        browser.tabs.executeScript(tab.id, {file: "content_scripts/fill-username-and-password.js"}, function (result) {
            console.log("Done, now send user and password!");
            Keepass.getLogins(tab.url, function (entry) {
                browser.tabs.sendMessage(tab.id, {
                    type: "username-and-password",
                    username: entry.Login,
                    password: entry.Password
                });
            });

        });
    }
});
