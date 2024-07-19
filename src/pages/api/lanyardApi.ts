// lanyardApi.ts

export interface LanyardData {
    data: {
      activities: any[];
      active_on_discord_mobile: boolean;
      active_on_discord_desktop: boolean;
      listening_to_spotify: boolean;
      spotify: {
        track_id: string;
        timestamps: {
          start: number;
          end: number;
        };
        song: string;
        artist: string;
        album_art_url: string;
        album: string;
      } | null;
      discord_user: {
        id: string;
        username: string;
        discriminator: string;
        avatar: string;
      };
      discord_status: string;
    };
  }
  
  export const fetchLanyardData = async (userId: string): Promise<LanyardData> => {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  