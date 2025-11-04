import { InputAdornment, IconButton, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onClear?: () => void
}

export default function SearchBar({ value, onChange, onFocus, onBlur, onClear }: Props) {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search problems..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'rgba(255,255,255,0.6)' }} />
          </InputAdornment>
        ),
        endAdornment: (
          value ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="Clear search"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onClear?.()}
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null
        )
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          color: 'rgba(226,232,240,0.95)',
          bgcolor: 'rgba(255,255,255,0.04)',
          borderRadius: 2,
          '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.16)' },
          '&.Mui-focused fieldset': { borderColor: '#22d3ee' },
        },
        '& .MuiInputBase-input': { py: 1.1 },
      }}
    />
  )
}


