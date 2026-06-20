import { useState, useEffect } from "react";
import api from "../services/api";
import "./EditDeviceModal.css";

function EditDeviceModal({
  device,
  isOpen,
  onClose,
}) {

  const [name, setName] = useState("");

  const [ip, setIp] = useState("");

  useEffect(() => {

    if (device) {

      setName(device.name);

      setIp(device.ip);

    }

  }, [device]);



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.put(

        `/devices/${device.id}`,

        {

          name,

          ip,

        }

      );

      onClose();

    }

    catch (err) {

      console.error(err);

      alert("Failed to update device");

    }

  };



  if (!isOpen || !device) {

    return null;

  }



  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Device</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Name</label>

            <input

              type="text"

              value={name}

              onChange={(e) =>

                setName(e.target.value)

              }

              required

            />

          </div>



          <div className="form-group">

            <label>IP Address</label>

            <input

              type="text"

              value={ip}

              onChange={(e) =>

                setIp(e.target.value)

              }

              required

            />

          </div>



          <div className="modal-actions">

            <button

              type="button"

              className="cancel-btn"

              onClick={onClose}

            >

              Cancel

            </button>



            <button

              type="submit"

              className="save-btn"

            >

              Save

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditDeviceModal;