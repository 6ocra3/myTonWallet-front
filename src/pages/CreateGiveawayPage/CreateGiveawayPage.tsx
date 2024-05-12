import { useFormik } from 'formik';
import { useState, type FC } from 'react';
import { Page } from '~/components/Page/Page.tsx';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { GiveawaySuccessPage, GiveawaySuccessProps } from '../GiveawaySuccessPage/GiveawaySuccessPage';

export const CreateGiveawayPage: FC = () => {
  const [response, setResponse] = useState<GiveawaySuccessProps['data'] | null>(null);
  const formik = useFormik({
    initialValues: {
      secret: "",
      type: 'instant',
      endsAt: undefined,
      tokenAddress: '',
      amount: 0,
      receiverCount: 1,
      taskUrl: '',
    },
    onSubmit: async (values) => {
      const payload = {
        giveaway: {
          type: values.type,
          endsAt: values.endsAt,
          tokenAddress: values.tokenAddress || undefined, // Используем undefined для пустых строк
          amount: values.amount,
          receiverCount: values.receiverCount,
          taskUrl: values.taskUrl || undefined,
        },
        secret: values.secret
      };

      await fetch('https://myback.loca.lt/giveaways', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => 
        {
        console.log(data)
        setResponse(data)
        });
    },
  });

  return (
    !response ?
    <Page title="Create giveaway">
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="secret"
        name="secret"
        value={formik.values.secret}
        onChange={formik.handleChange}>

      
      </TextField>
      <FormControl component="fieldset">
        <FormLabel component="legend">Type</FormLabel>
        <RadioGroup
          row
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
        >
          <FormControlLabel value="instant" control={<Radio />} label="Instant" />
          <FormControlLabel value="lottery" control={<Radio />} label="Lottery" />
        </RadioGroup>
      </FormControl>

      {formik.values.type === 'lottery' && (
        <TextField
          label="Ends At"
          type="datetime-local"
          name="endsAt"
          value={formik.values.endsAt}
          onChange={formik.handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}

      <TextField
        label="Token Address (leave blank for Toncoin)"
        name="tokenAddress"
        value={formik.values.tokenAddress}
        onChange={formik.handleChange}
      />

      <TextField
        label="Amount"
        type="number"
        name="amount"
        value={formik.values.amount}
        onChange={formik.handleChange}
      />

      <TextField
        label="Number of Receivers"
        type="number"
        name="receiverCount"
        value={formik.values.receiverCount}
        onChange={formik.handleChange}
      />

      <TextField
        label="Task URL"
        name="taskUrl"
        value={formik.values.taskUrl}
        onChange={formik.handleChange}
      />

      <Button type="submit" variant="contained" color="primary">
        Create Giveaway
      </Button>
    </form>
  </Page>
    :
  <GiveawaySuccessPage data={response}/>
  );
};
