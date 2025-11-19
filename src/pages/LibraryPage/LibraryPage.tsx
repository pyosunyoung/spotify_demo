import styled from '@emotion/styled'
import { Box } from '@mui/material'
import React from 'react'
import LibraryHead from '../../layout/components/LibraryHead'
import Library from '../../layout/components/Library'

const Layout = styled("div")({
    display: "flex",
    height: "100vh",
    padding: "8px",

})
const ContentBox = styled(Box)(({ theme }) => ({
    borderRadius: "8px",
    
    width: "100%",
    padding: "20px",
    marginBottom: "8px",
    marginRight: "8px",
}))

const LibraryPage = () => {
    return (
        <Layout>
            <ContentBox height="100%">
                <LibraryHead />
                <Library />
            </ContentBox>

        </Layout>
    )
}

export default LibraryPage