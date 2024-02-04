type TCommand = 'config' | 'get' | 'set' | 'event' | 'consent';

type TCommandName = 'click' | 'addvertisement_click';

declare let google: any;
declare let gapi: any;
declare let gtag: (
  command: TCommand,
  commandName: TCommandName,
  params: Record<string, unknown>,
) => void;
