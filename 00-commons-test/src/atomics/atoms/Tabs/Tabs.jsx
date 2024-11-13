/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Diego Valencia [11/07/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React, { useEffect, useRef, useState } from "react";

const Tabs = ({ tabsArray, extraClass, onChangeTabs }) => {
  const markerRef = useRef(null);

  const findCurrentTab = () => {
    return tabsArray.findIndex((tab) => tab.checked);
  };

  const [currentPage, setCurrentPage] = useState(
    findCurrentTab()
  );

  const handleMenuClick = (
    e,
    id
  ) => {
    if (markerRef.current) {
      markerRef.current.style.width = `${e.currentTarget.offsetWidth}px`;
      markerRef.current.style.left = `${e.currentTarget.offsetLeft}px`;
    }

    setCurrentPage(id);
  };

  useEffect(() => {
    const menuNodes = document.getElementsByClassName('tab-selected');
    const menuNode = Array.from(menuNodes)[0];

    if (markerRef.current) {
      markerRef.current.style.width = `${menuNode?.offsetWidth}px`;
      markerRef.current.style.left = `${menuNode?.offsetLeft}px`;
      markerRef.current.style.display = "block";
    }
  }, [currentPage]);

  return <section className={`${extraClass}`}>
    <div className={"container-tabs"}>
      <div className={"tabs_wrapper"}>
        {tabsArray.map((tab, index) => {
          return (
            <section key={`key${index + 1}`} style={{ marginRight: '2rem' }}>
              <input
                key={`key${index + 1}`}
                type="radio"
                name="tabs"
                id={`tab_${index + 1}`}
                className={"meteb"}
                checked={tab.checked}
                onClick={(e) => handleMenuClick(e, index)}
                onChange={(e) => {
                  onChangeTabs(e, index, tabsArray);
                }}
              />
              <label className={`${"tab"} ${tab.checked ? 'tab-selected' : ''}`} htmlFor={`tab_${index + 1}`}>
                <span className={"title"}>{tab.title}</span>
              </label>
            </section>
          );
        })}

        <span className={"shape"} ref={markerRef}></span>

      </div>
    </div>
  </section>;
}

export default Tabs;
