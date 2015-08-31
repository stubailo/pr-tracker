GitHubAPIClient = {
  getOpenedPRs() {
    return GitHubAPIClient.request("get", "orgs/meteor/issues", {
      filter: "created"
    });
  },

  request(method, url, data) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-logged-in");
    }

    const fullUrl = `https://api.github.com/${url}`;
    const accessToken = Meteor.user().services.github.accessToken;

    const httpOptions = {
      headers: {
        Authorization: `token ${accessToken}`,
        "User-Agent": "PR-Tracker"
      }
    }

    if (method === "post") {
      httpOptions.data = data;
    } else if (method === "get") {
      httpOptions.params = data;
    } else {
      throw new Error("unrecognized-method");
    }

    return HTTP.call(method, fullUrl, httpOptions);
  }
}

Meteor.methods({
  _debugGitHubAPI(methodName, ...args) {
    return GitHubAPIClient[methodName].apply(GitHubAPIClient, args);
  }
})
