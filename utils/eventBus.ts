import mitt from 'mitt';

const eventBus = mitt<{
  loginSuccess: { user: any };
}>();

export default eventBus;
