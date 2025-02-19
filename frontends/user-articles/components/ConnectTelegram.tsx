import { TelegramIcon } from 'components/icons';
import { Button } from 'components/lib';
import { useTheme } from 'hooks';
import { FC, useCallback } from 'react';
import { useGetAuthCode } from 'store/clients/blog';
import { useGetTelegramChannelConnectionStatus } from 'store/clients/telegram';

export const ConnectTelegram: FC = () => {
  const { data } = useGetTelegramChannelConnectionStatus();
  const { refetch: fetchAuthCode, isLoading } = useGetAuthCode();
  const { themeColors } = useTheme();

  const connectWithBotHandler = useCallback(async () => {
    try {
      const code = (await fetchAuthCode()).data;
      window.open(`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=${code}`, '_blank');
    } catch (e) {
      alert(e);
    }
  }, [fetchAuthCode]);

  const openTelegramBot = useCallback(() => {
    try {
      window.open(
        `https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=connect-with-channel`,
        '_blank',
      );
    } catch (e) {
      alert(e);
    }
  }, []);

  if (data?.isConnectedWithBot === false)
    return (
      <div className='text-center'>
        <TelegramIcon color={themeColors.icon} width={40} height={40} />
        <p>Telegram botimiz orqali yangi maqolalar haqida xabarlar oling</p>
        <Button
          className='d-flex w-100 justify-content-center align-items-center f-gap-1'
          onClick={connectWithBotHandler}
          loading={isLoading}
        >
          <TelegramIcon color={themeColors.icon} width={20} height={20} />
          Telegram bilan ulash
        </Button>
      </div>
    );

  if (data?.isConnectedWithChannel === false)
    return (
      <div className='text-center'>
        <TelegramIcon color={themeColors.icon} width={40} height={40} />
        <p className='my-1'>UPPER blogingizni Telegram kanalingiz bilan ulang</p>
        <Button
          className='d-flex w-100 justify-content-center align-items-center f-gap-1'
          onClick={openTelegramBot}
        >
          <TelegramIcon color={themeColors.icon} width={20} height={20} />
          Telegram bilan ulash
        </Button>
      </div>
    );

  return null;
};
