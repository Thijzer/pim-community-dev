import CampaignFetcher from 'akeneocommunicationchannel/fetcher/campaign';
const DataCollector = require('pim/data-collector');

beforeEach(() => {
  jest.resetModules();
});

test('It gets the PIM campaign from the data collector', async () => {
  const route = 'pim_analytics_data_collect';
  const apiResponse = {
    pim_version: '4.0',
    pim_edition: 'CE',
  };
  const campaign = 'CE4.0';
  DataCollector.collect.mockImplementation(() => route).mockResolvedValue(apiResponse);
  const response = await CampaignFetcher.fetch();

  expect(DataCollector.collect).toHaveBeenCalledWith(route);
  expect(response).toBe(campaign);
});

test('It does not call twice the DataCollector when it already fetch the campaign', async () => {
  DataCollector.collect.mockImplementation(() => 'pim_analytics_data_collect');
  await CampaignFetcher.fetch();

  await CampaignFetcher.fetch();

  expect(DataCollector.collect).toHaveBeenCalledTimes(1);
});
