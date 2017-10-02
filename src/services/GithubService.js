import Axios from "axios";

export default {
    getIssues: (username) => {
        const query = "type:pr author:" + username + " -user:" + username;
        const url = "https://api.github.com/search/issues";

        return Axios.get(url, {
            params: { q: query }
        });
    },
    getPullRequestInfoByIssue: (issue) => {
        return Axios.get(issue["pull_request"].url);
    }
};
