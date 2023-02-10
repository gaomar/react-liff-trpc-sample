import { useEffect, useState } from 'react'
import liff from '@line/liff'
import { Container, Box, Typography, Button, Avatar } from '@mui/material'
import { trpc } from '@/App'
import { useLoading } from '@/libs/loading/Loading'
import { type Profile } from '@liff/get-profile'

const Top = () => {
  const [profileName, setProfileName] = useState<string>('')
  const [pictureUrl, setPictureUrl] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const { showLoading } = useLoading()
  const profile = trpc.profile.useMutation()

  useEffect(() => {
    liff
      .getProfile()
      .then((profile: Profile) => {
        setProfileName(profile.displayName)
        setPictureUrl(profile.pictureUrl ?? '')
      })
      .catch((err) => {
        console.error({ err })
      })
    setToken(liff.getAccessToken() as string)
    document.title = 'トップページ'
  }, [])

  return (
    <Container maxWidth="md" sx={{ marginY: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h4">
          LIFF動作確認
        </Typography>
        <Avatar
          alt={profileName}
          src={pictureUrl}
          sx={{
            width: '100px',
            height: '100px'
          }}
        />
        <Typography component="h2" variant="h6">
          プロフィール名：{profileName}
        </Typography>

        <Button
          variant="contained"
          size="large"
          color="success"
          sx={{ marginTop: 5, textTransform: 'none' }}
          onClick={() => {
            showLoading(true, '処理中...')
            profile.mutate(
              { token },
              {
                onSuccess: () => {
                  showLoading(false, '')
                },
                onError: () => {
                  showLoading(false, '')
                }
              }
            )
          }}
        >
          LINE UserId取得 (tRPC経由)
        </Button>
        <h2>UserId: {profile.data?.userId ?? ''}</h2>
      </Box>
    </Container>
  )
}

export default Top
