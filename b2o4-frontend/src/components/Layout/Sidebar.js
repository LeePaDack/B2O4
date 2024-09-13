import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SidebarCss.css";

const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const [footerHeight, setFooterHeight] = useState(100); // 기본값 설정
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const handleResize = () => {
      // 푸터의 높이를 동적으로 가져와서 설정
      const footerElement = document.querySelector("footer");
      if (footerElement) {
        setFooterHeight(footerElement.offsetHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="sidebar-container" style={{ bottom: footerHeight + 20 }}>
      <button
        className={`scroll-to-top ${visible ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
      <button onClick={goBack} className="sidebar-button">
        ← Back
      </button>
    </div>
  );
};

export default Sidebar;