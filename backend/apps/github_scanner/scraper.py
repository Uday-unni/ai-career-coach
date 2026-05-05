import requests

def scrape_github(username):
    try:
        url = f"https://api.github.com/users/{username}/repos?per_page=100"
        response = requests.get(url)

        if response.status_code == 404:
            raise ValueError(f"GitHub user '{username}' not found.")

        if response.status_code != 200:
            raise ValueError("Failed to fetch GitHub repos.")

        repos = response.json()

        clean_repos = []
        for repo in repos:
            clean_repos.append({
                "name": repo.get("name"),
                "language": repo.get("language"),
                "description": repo.get("description"),
                "stars": repo.get("stargazers_count", 0),
                "updated_at": repo.get("updated_at"),
            })

        return clean_repos

    except requests.exceptions.ConnectionError:
        raise ValueError("Could not connect to GitHub. Check internet connection.")