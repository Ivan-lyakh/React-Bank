import { FaPaperPlane } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";




export const title = (value: string) => {

  switch (value) {

    case "transfer": {
      return <h2 style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "5px" }} className="title">Transfer<FaPaperPlane /></h2>
    }

    case "deposit": {
      return <h2 style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "5px" }} className="title">Deposit<FaPlusCircle /></h2>
    }

    case "windtraw": {
      return <h2 style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "5px" }} className="title">Windtraw<FaMinusCircle /></h2>
    }

    case "loan": {
      return <h2 style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "5px" }} className="title">Loan<FaHandHoldingUsd /></h2>
    }

  }

}

