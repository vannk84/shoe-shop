import { ref, onMounted } from 'vue';

export function useTheme() {
  const theme = ref<string>(localStorage.getItem('theme') || 'light');

  const applyTheme = (value: string) => {
    theme.value = value;
    localStorage.setItem('theme', value);
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    applyTheme(theme.value === 'light' ? 'dark' : 'light');
  };

  onMounted(() => {
    applyTheme(theme.value);
  });

  return {
    theme,
    toggleTheme,
  };
}
