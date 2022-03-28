import Subscriptions from '../components/SubscriptionsList';

const SubscriptionsContainer = (): JSX.Element => {
  return (
    <div className="flex justify-center flex-col space-y-8">
      <h1 className="text-3xl font-bold ">Subscriptions</h1>

      <Subscriptions />
    </div>
  );
};

export default SubscriptionsContainer;
