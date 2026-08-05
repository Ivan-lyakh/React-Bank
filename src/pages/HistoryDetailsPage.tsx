import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { HistoryDetails } from "../components/HistoryDetails";
import { ErrorModal } from "../components/Error/ErrorModal";
import { Loading } from "../components/Loading/Loading";

import { useHistory } from "../hooks/useHistory";
import { useUser } from "../hooks/useUser";
import { useAccount } from "../hooks/useAccount";

import type { History } from "../types/HistoryTypes";

export const HistoryDetailsPage = () => {
  const { id } = useParams();

  const { user } = useUser();
  const { loadAccount, account } = useAccount();
  const { loadHistory, history } = useHistory();

  const [data, setData] = useState<History | null>(null);

  useEffect(() => {
    if (!user) return;
    loadAccount();
  }, [user]);

  useEffect(() => {
    if (!account.account) return;
    loadHistory(account.account.account_number);
  }, [account.account]);

  useEffect(() => {
    if (!id) return;

    const transaction = history.history.find(
      item => item.id === Number(id)
    );

    setData(transaction ?? null);
  }, [history.history, id]);

  if (history.loading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorModal message="History not found!" />;
  }

  return <HistoryDetails data={data} />;
};