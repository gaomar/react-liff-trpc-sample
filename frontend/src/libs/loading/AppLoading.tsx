import * as React from 'react'
import {
  Backdrop,
  CircularProgress,
  Paper,
  Typography,
  Grid
} from '@mui/material'

/** AppLoading コンポーネントに渡す props の型情報 */
interface Props {
  /** ローディングを表示するか */
  open: boolean

  /** ローディングに表示するメッセージ */
  message?: string
}

/** ローディング画面を表示するコンポーネント */
export const AppLoading: React.FC<Props> = ({
  open,
  message = '読み込み中'
}) => {
  return (
    <Backdrop open={open}>
      <Paper
        sx={{
          display: 'flex',
          width: '220px',
          height: '100px'
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="inherit" />
          <Typography>{message}</Typography>
        </Grid>
      </Paper>
    </Backdrop>
  )
}
