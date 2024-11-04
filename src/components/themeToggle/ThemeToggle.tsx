import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #007bff; /* Light theme color */
  }

  &:checked + ${Slider}:before {
    transform: translateX(26px); /* Move the toggle */
  }
`;

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ToggleContainer>
            <ToggleSwitch>
                <Checkbox type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                <Slider />
            </ToggleSwitch>
        </ToggleContainer>
    );
};

export default ThemeToggle;