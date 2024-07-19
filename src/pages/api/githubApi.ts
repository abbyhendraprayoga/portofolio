export interface GitHubRepo {
    name: string;
    description: string;
    html_url: string;
}

export const fetchGitHubProjects = async (username: string): Promise<GitHubRepo | null> => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=1`);
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        const data: GitHubRepo[] = await response.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        return null;
    }
};
