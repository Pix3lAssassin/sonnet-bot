import axios from 'axios';

const getPoem = async (seed?: string) => {
  try {
    const { data } = await axios.get<{ seed: string; sonnet: string }>(
      `https://sonnet-bot-api.herokuapp.com/sonnet${seed ? `/${seed}` : ''}`,
    );

    return data;
  } catch (e: any) {
    return { seed: '', sonnet: 'Error fetching poem, please try again later.' };
  }
};

export default getPoem;
