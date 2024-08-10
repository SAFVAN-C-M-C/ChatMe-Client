import { darkTheme } from '@/helper/theme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { Dispatch, FC, SetStateAction } from 'react'
interface SelectTimeRangeProps {
    setOpenSelectTimeRange: Dispatch<SetStateAction<boolean>>;
    handleCustomRangeChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
    customRange:{
        start: string;
        end: string;
    }
  }
const SelectTimeRange:FC<SelectTimeRangeProps> = ({setOpenSelectTimeRange,handleCustomRangeChange,customRange}) => {
    const handleClose = () => {
        setOpenSelectTimeRange(false);
      };
    return (
    <>
        <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Dialog

      open
      onClose={handleClose}
    >
      <DialogTitle align="center">Select Range</DialogTitle>
      <DialogContent>
        
        <div className='w-[200px]'>
        <label htmlFor="">Start Date</label>
        <TextField
          placeholder="Enter a proper Job Title"
          autoFocus
          value={customRange?.start}
          onChange={handleCustomRangeChange}
          required
          margin="dense"
          id="start"
          name="start"
          type="date"
          fullWidth
        />
        <label htmlFor="">End Date</label><TextField
        placeholder="Enter a proper Job Title"
        autoFocus
        value={customRange?.end}
        onChange={handleCustomRangeChange}
        required
        margin="dense"
        id="end"
        name="end"
    
        type="date"
        fullWidth
      />
        </div>
        
      </DialogContent>
    </Dialog>
    </ThemeProvider>
    </>
  )
}

export default SelectTimeRange