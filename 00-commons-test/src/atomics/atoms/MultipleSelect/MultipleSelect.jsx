/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Diego Valencia [11/07/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './MultipleSelect.module.scss';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const MultipleSelect = ({ options, label, required, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.some((selected) => selected.value === option.value)) {
      setSelectedOptions(selectedOptions.filter((item) => item.value !== option.value));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles['component-select']}>
      <div className={styles['multi-select']}>
        <div className={styles["select-container", `${isOpen ? 'open' : ''}`]} onClick={handleToggleDropdown}>
          <div className={styles['selected-options']}>
            <div className={`${styles["select-label"]}`}>
              <span className={`${isOpen || selectedOptions.length > 0 ? styles['text-on-border'] : ''}`}>{label}{required ? <span className={styles.required}>{`${' '} *`}</span> : ''}</span>
              <span className={`${styles["select-options"]}`}>{selectedOptions.length > 0 ? selectedOptions.map((option) => option.label).join(', ') : null}</span>
              {isOpen ?
                <KeyboardArrowUpOutlinedIcon className={styles["icon-up"]} />
                :
                <KeyboardArrowDownOutlinedIcon className={styles["icon"]} />
              }
            </div>
          </div>
        </div>
        {isOpen && (
          <div className={styles["modal-container"]}>
            <div className={styles["options-container"]}>
              {options.map((option) => (
                <div key={option.value}>
                  <label className={styles['option']}>
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOptions.some((selected) => selected.value === option.value)}
                      onChange={() => handleCheckboxChange(option)}
                      className={styles['option-checkbox']}
                    />
                    <span className={`${styles["option-label"]}`}>{option.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

MultipleSelect.propTypes = {
  options: PropTypes.array,
  selectedOptions: PropTypes.string,
  setSelectedOptions: PropTypes.func,
  label: PropTypes.string,
  required: PropTypes.bool
}

export default MultipleSelect;
