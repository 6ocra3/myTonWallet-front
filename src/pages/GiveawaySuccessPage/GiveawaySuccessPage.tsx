import { type FC } from 'react';
import { Page } from '~/components/Page/Page.tsx';

export type GiveawaySuccessProps = {
    data: {
      giveawayLink?: string;
      topUpLink?: string;
      taskToken?: string;
    } | null;
  };
  
export const GiveawaySuccessPage: FC<GiveawaySuccessProps> = ({ data }) => {
    return (
      data && <Page title="Giveaway created">
        {data.giveawayLink && <p>{data.giveawayLink}</p>}
        {data.topUpLink && <p>{data.topUpLink}</p>}
        {data.taskToken && <p>{data.taskToken}</p>}
      </Page>
    );
  };
