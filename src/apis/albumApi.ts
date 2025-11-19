import axios from "axios"
import { SPOTIFY_BASE_URL } from "../configs/commonConfig"
import { getAlbumResponse, getAlbumsRequest, getAlbumTracksRequest, getAlbumTracksResponse, getNewReleasesResponse } from "../models/album";

export const getNewReleases = async (clientCredentialToken: string): Promise<getNewReleasesResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`,
            {
                headers: {
                    Authorization: `Bearer ${clientCredentialToken}`
                },
            }


        );
        return response.data;
    } catch (error) {
        throw new Error("Fail to fetch new releases");
    }
}

export const getAlbum = async (clientCredentialToken: string, params:getAlbumsRequest): Promise<getAlbumResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/albums`,
            {
                headers: {
                    Authorization: `Bearer ${clientCredentialToken}`
                },
                params: {
                    ids: params.ids,
                  },
            }


        );
        return response.data;
    } catch (error) {
        throw new Error("Fail to fetch get album");
    }
}

export const getAlbumTracks= async (clientCredentialToken: string, params:getAlbumTracksRequest): Promise<getAlbumTracksResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${clientCredentialToken}`
                },
                params: {
                    ids: params.ids,
                    limit: params.limit,
                    offset: params.offset
                }
            }


        );
        return response.data;
    } catch (error) {
        throw new Error("Fail to fetch get AlbumTracks");
    }
}


