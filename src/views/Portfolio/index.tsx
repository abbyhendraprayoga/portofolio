import Image from 'next/image';
import styles from './portfolio.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchLanyardData, LanyardData } from '../../pages/api/lanyardApi';
import { fetchGitHubProjects, GitHubRepo } from '../../pages/api/githubApi';

const PortfolioViews = () => {
    const [lanyardData, setLanyardData] = useState<LanyardData | null>(null);
    const [githubRepo, setGitHubRepo] = useState<GitHubRepo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const userId = "1068823773601611816"; // Ganti dengan ID pengguna Discord yang ingin Anda tampilkan

        const fetchData = async () => {
            try {
                const [lanyardRes, githubRes] = await Promise.all([
                    fetchLanyardData(userId),
                    fetchGitHubProjects('abbyhendraprayoga') // Ganti dengan username GitHub yang ingin Anda ambil proyeknya
                ]);

                setLanyardData(lanyardRes);
                setGitHubRepo(githubRes);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        // Menampilkan animasi atau pesan Loading saat data sedang dimuat
        return (
            <div className={styles.portfolio}>
                <div className={styles.container}>
                    <div className={styles.profileContainer}>
                        <div className={styles.profileHeaders}>
                            <div className={styles.profilePictureLoading}>
                                <div className={styles.loadingImage}></div>
                            </div>
                            <div className={styles.profileInfo}>
                                <h1 className={styles.name}>{lanyardData?.data.discord_user.username || <span className={styles.dot}>...</span>}</h1>
                                {lanyardData?.data.activities && lanyardData.data.activities.length > 0 ? (
                                    <span className={styles.activity}>
                                        {lanyardData.data.activities[0].type === 0 ? 'Playing' : 'Listening to'} {lanyardData.data.activities[0].name}
                                        <svg className={styles.activitySvg} width="22" height="22" viewBox="0 0 16 15" fill="white">
                                            <path fill="currentColor" d="M6,7 L2,7 L2,6 L6,6 L6,7 Z M8,5 L2,5 L2,4 L8,4 L8,5 Z M8,3 L2,3 L2,2 L8,2 L8,3 Z M8.88888889,0 L1.11111111,0 C0.494444444,0 0,0.494444444 0,1.11111111 L0,8.88888889 C0,9.50253861 0.497461389,10 1.11111111,10 L8.88888889,10 C9.50253861,10 10,9.50253861 10,8.88888889 L10,1.11111111 C10,0.494444444 9.5,0 8.88888889,0 Z" transform="translate(3 3)"></path>
                                        </svg>
                                    </span>
                                ) : (
                                    <span className={styles.activity}>
                                        Loading<span className={styles.dot}>...</span>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={styles.profileBody}>
                            <div className={styles.aboutBody}>
                                <div className={styles.aboutInfo}>
                                    <h1>Hello there!</h1>
                                    <span>I&apos;m a programmer who loves to code and learn new things. I&apos;m currently learning web development and I&apos;m also interested in game development.</span>
                                    <span>When I&apos;m not coding, you can find me battling it out in VALORANT or Mobile Legends, tapping away in osu!, or building incredible structures in Minecraft.</span>
                                </div>
                            </div>
                            <div className={styles.projectsBody}>
                                <div className={styles.projectsInfo}>
                                    <h1>Latest Project</h1>
                                    {githubRepo ? (
                                        <Link href={githubRepo.html_url}>{githubRepo.name}</Link>
                                    ) : (
                                        <span className={styles.projectInfoLoading}>
                                            Loading<span className={styles.dot}>...</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.profileFooter}>
                            <Link href="/#/projects" className={styles.button}>Projects</Link>
                            <Link href="https://github.com/AbbyHendraa" target="_blank" className={styles.button}>GitHub</Link>
                            <Link href="https://instagram.com/abbyhendraa_" target="_blank" className={styles.button}>Instagram</Link>
                            <Link href="https://saweria.co/shelzn" target="_blank" className={styles.button}>Donate</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.portfolio}>
            <div className={styles.container}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileHeaders}>
                        <Image
                            src={`https://cdn.discordapp.com/avatars/${lanyardData?.data.discord_user.id}/${lanyardData?.data.discord_user.avatar}.png`}
                            alt={lanyardData?.data.discord_user.username || "User Avatar"}
                            width={100}
                            height={100}
                            className={styles.profilePicture}
                        />
                        <div className={styles.profileInfo}>
                            <h1 className={styles.name}>{lanyardData?.data.discord_user.username}</h1>
                            {lanyardData?.data.activities && lanyardData.data.activities.length > 0 ? (
                                <span className={styles.activity}>
                                    {lanyardData.data.activities[0].type === 0 ? 'Playing' : 'Listening to'} {lanyardData.data.activities[0].name}
                                    <svg className={styles.activitySvg} width="22" height="22" viewBox="0 0 16 15" fill="white">
                                        <path fill="currentColor" d="M6,7 L2,7 L2,6 L6,6 L6,7 Z M8,5 L2,5 L2,4 L8,4 L8,5 Z M8,3 L2,3 L2,2 L8,2 L8,3 Z M8.88888889,0 L1.11111111,0 C0.494444444,0 0,0.494444444 0,1.11111111 L0,8.88888889 C0,9.50253861 0.497461389,10 1.11111111,10 L8.88888889,10 C9.50253861,10 10,9.50253861 10,8.88888889 L10,1.11111111 C10,0.494444444 9.5,0 8.88888889,0 Z" transform="translate(3 3)"></path>
                                    </svg>
                                </span>
                            ) : (
                                <span className={styles.activity}>
                                    Not playing anything
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={styles.profileBody}>
                        <div className={styles.aboutBody}>
                            <div className={styles.aboutInfo}>
                                <h1>Hello there!</h1>
                                <span>I&apos;m a programmer who loves to code and learn new things. I&apos;m currently learning web development and I&apos;m also interested in game development.</span>
                                <span>When I&apos;m not coding, you can find me battling it out in VALORANT or Mobile Legends, tapping away in osu!, or building incredible structures in Minecraft.</span>
                            </div>
                        </div>
                        <div className={styles.projectsBody}>
                            <div className={styles.projectsInfo}>
                                <h1>Latest Project</h1>
                                {githubRepo ? (
                                    <Link href={githubRepo.html_url}>{githubRepo.name}</Link>
                                ) : (
                                    <span>No project found</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.profileFooter}>
                        <Link href="/#/projects" className={styles.button}>Projects</Link>
                        <Link href="https://github.com/AbbyHendraa" target="_blank" className={styles.button}>GitHub</Link>
                        <Link href="https://instagram.com/abbyhendraa_" target="_blank" className={styles.button}>Instagram</Link>
                        <Link href="https://saweria.co/shelzn" target="_blank" className={styles.button}>Donate</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioViews;
