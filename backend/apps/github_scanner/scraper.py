import os
import requests


def scrape_github(username):
    try:
        username = username.strip()
        username = username.replace("https://github.com/", "").strip("/")

        url = f"https://api.github.com/users/{username}/repos?per_page=100"

        headers = {
            "Accept": "application/vnd.github+json",
            "User-Agent": "Rezumi-App",
        }

        token = os.getenv("GITHUB_TOKEN")
        if token:
            headers["Authorization"] = f"Bearer {token}"

        response = requests.get(url, headers=headers, timeout=20)

        if response.status_code == 404:
            raise ValueError(f"GitHub user '{username}' not found.")

        if response.status_code != 200:
            raise ValueError(
                f"GitHub API error {response.status_code}: {response.text}"
            )

        repos = response.json()

        if not isinstance(repos, list):
            raise ValueError(f"Unexpected GitHub response: {repos}")

        if len(repos) == 0:
            raise ValueError("No public repositories found for this username.")

        clean_repos = []
        for repo in repos:
            clean_repos.append({
                "name": repo.get("name"),
                "language": repo.get("language"),
                "description": repo.get("description"),
                "stars": repo.get("stargazers_count", 0),
                "forks": repo.get("forks_count", 0),
                "updated_at": repo.get("updated_at"),
                "html_url": repo.get("html_url"),
            })

        return clean_repos

    except requests.exceptions.Timeout:
        raise ValueError("GitHub request timed out. Try again.")
    except requests.exceptions.ConnectionError:
        raise ValueError("Could not connect to GitHub. Check internet connection.")
