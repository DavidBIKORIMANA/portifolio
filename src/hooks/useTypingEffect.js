import { useEffect, useState } from 'react';

export function useTypingEffect(roles, enabled = true) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) {
      setText(roles[0] || '');
      return undefined;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const type = () => {
      const current = roles[roleIndex];
      charIndex = deleting ? charIndex - 1 : charIndex + 1;
      setText(current.substring(0, charIndex));

      let delay = deleting ? 45 : 90;
      if (!deleting && charIndex === current.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }
      timeoutId = window.setTimeout(type, delay);
    };

    timeoutId = window.setTimeout(type, 600);
    return () => window.clearTimeout(timeoutId);
  }, [roles, enabled]);

  return text;
}
