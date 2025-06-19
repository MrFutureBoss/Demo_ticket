interface ClientSave {
  id: string;
  tabs: string;
  table: {
    devmode: boolean;
    theme: {
      header: string;
      body: string;
    };
    columnsDisplay: {
      feedback: boolean;
      gmail: boolean;
      email: boolean;
      location: boolean;
    };
    fields: {
      template: string;
      ruleSet: {
        text: string;
        status: number;
        assignee: string;
        priority: boolean;
      };
    };
  };
  summary: boolean;
  guide: {
    firstLogin: boolean;
    newbie: {
      learnHowToUseTable: boolean;
      learnHowToUseBoard: boolean;
      learnHowToUseSummary: boolean;
      learnHowToUseCalendar: boolean;
    };
  };
}

interface ClientSaveResponse {
  data: ClientSave;
}

export type { ClientSave, ClientSaveResponse };
