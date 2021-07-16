import { gql } from '@apollo/client/core';

export const GET_ROCKETS = gql`
    query GetRockets {
        launchesPast(limit: 10) {
            id
            links {
                video_link
            }
            rocket {
                rocket_name
                first_stage {
                    cores {
                        core {
                            status
                        }
                    }
                }
            }
        }
    }
`
