import React from "react";
import { Link } from "react-router-dom";
import "./aboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <div className="abouttext">
        אנרגיה סולארית היא סוג של אנרגיה מתחדשת שמקורה בקרינת השמש. מקור האנרגיה
        העיקרי של כדור הארץ היא אנרגיה סולארית, אנרגיית השמש אחראית על רוב
        תופעות האקלים. השמש היא אחת הגורמים ההכרחיים לקיום חיים בזכות הטמפרטורה
        הגבוהה יחסית בכדור הארץ. אנרגיה סולארית היא אחד ממקורות האנרגיה המתחדשת
        האידיאלית ביותר, שהיא נקייה, בלתי נדלית וחפת הגבלה אזורית. בשנים
        האחרונות מנצלים את האנרגיה הסולארית בשיטות שונות כדיי לייצר חשמל וחום.
        הפרויקט שלנו ייתן מידע רלוונטי עבור התקנת טכנולוגיית התא פוטו-וולטאי על
        גגות מבנים. המטרה היא להעריך את הפוטנציאל של המבנה להתקנת מערכת אנרגיה
        סולארית על גגות המבנים
        <div className="gridAbout">
          <Link className="link-about" to="/service/private">
            Private service
          </Link>

          <Link className="link-about" to="/service/organizational">
            Organizational service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
