import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { RiCloseLargeFill } from "react-icons/ri";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import {
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
  Menu,
  InputAdornment,
} from "@mui/material";






const typeOptions = [
  "Store Transactions",
  "Get Tipped ",
  "Withdrawals",
  "Chargebacks",
  "Cashbacks",
  "Refer & Earn",
];
const transactionTypeLabel = "Select Transaction Type";
const transactionStatusLabel = "Select Transaction Status";

const statusOptions = ["Successful", "Pending", "Failed"];

const MultiSelectDropdown = ({ options, labelName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleToggleMenu = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <>
      <TextField
        variant="outlined"
        fullWidth
        value={selectedValues.join(", ") || labelName}
        onClick={handleToggleMenu}
        slotProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IoIosArrowDown />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "#EFF1F6",
          borderRadius: "12px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          input: {
            cursor: "pointer",
          },
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              width: anchorEl?.clientWidth,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleChange(option)}>
            <Checkbox
              checked={selectedValues.includes(option)}
              sx={{
                color: "#131316", // unchecked color
                "&.Mui-checked": {
                  color: "#131316", // checked color
                },
              }}
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const DateInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="w-full"
          format="DD MMM YYYY"
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          slots={{
            openPickerIcon: () =>
              isOpen ? (
                <IoIosArrowUp size={20} color="#131316" />
              ) : (
                <IoIosArrowDown size={20} color="#131316" />
              ),
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "standard",
              sx: {
                "& .MuiInputBase-root": {
                  backgroundColor: "#EFF1F6", // Background of input field
                  borderRadius: "12px",
                  padding: "14px 18px 14px 18px",
                  "&::before": {
                    borderBottom: "none !important",
                  },
                  "&::after": {
                    borderBottom: "none !important",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
            },
            desktopPaper: {
              sx: {
                backgroundColor: "#ffffff", // Background color of the date picker pop-up
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Adds shadow effect
              },
            },
            day: {
              sx: {
                color: "#131316", // Default text color
                "&.Mui-selected": {
                  backgroundColor: "#131316 !important", // Selected date background
                  color: "#ffffff !important", // Selected date text color
                },
                "&:hover": {
                  backgroundColor: "#fff", // Hover effect
                  border: "1px solid #EFF1F6 !important",
                },
              },
            },
            actionBar: {
              sx: {
                button: {
                  color: "#131316", // "OK" and "Cancel" button color
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

const FilterModal = ({ closeModal, filterPeriods, selectedPeriod, setSelectedPeriod }) => {
  // const { transactions } = useSelector((state) => state.transaction);
 
  // const { selectedPeriod, setSelectedPeriod} = useTransactionFilter
  //   useTransactionFilter(transactions);

  return (
    <div
      className="fixed inset-0 z-[1000] flex justify-center items-center lg:items-start lg:justify-end  bg-gray-500/40 font-dmsans"
      onClick={closeModal}
    >
      <div
        className="bg-white shadow-lg w-full lg:w-[30vw] rounded-l-[10px] h-[90%] lg:h-full overflow-y-auto scrollbar-thin scrollbar-thumb-scrollbar-thumb hover:scrollbar-thumb-scrollbar-thumb-hover  scroll-smooth flex flex-col gap-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-[90%] overflow-auto">
          <div className="flex justify-between items-center py-[20px] px-6  w-full sticky top-0 bg-white ">
            <h2 className="font-[700] text-[24px] leading-[34px] text-primary">
              Filter
            </h2>
            <button onClick={closeModal} className="w-[34px] h-[34px]">
              <RiCloseLargeFill className="w-6 h-6 text-primary cursor-pointer" />
            </button>
          </div>
          <div className="px-[22px] pt-2 pb-[22px]">
            <div className="flex gap-[12px] overflow-auto scroll-smooth no-scrollbar">
              {filterPeriods.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedPeriod(item.id);
                    closeModal();
                  }}
                  className={`w-auto h-[36px] rounded-[100px] border  flex justify-center items-center text-center text-nowrap cursor-pointer ${
    selectedPeriod === item.id
      ? 'bg-primary text-white border-none'
      : 'bg-white border-[#EFF1F6]  text-primary'
  } py-[10px] px-[18px] text-[14px] font-[600]`}
                >
                  {item.period}
                </button>
              ))}
            </div>
            <div className="pt-6 flex flex-col gap-6 justify-center max-w-full">
              <div className="flex flex-col gap-[12px] w-full">
                <label className="font-[600] text-[16px] leading-[24px] text-primary">
                  Date Range
                </label>
                <div className="flex gap-[6px] items-center w-full">
                  <DateInput />
                  <DateInput />
                </div>
              </div>
              <div className="flex flex-col gap-[12px] w-full">
                <label className="font-[600] text-[16px] leading-[24px] text-primary">
                  Transaction Type
                </label>
                <div className="flex items-center w-full">
                  <MultiSelectDropdown
                    options={typeOptions}
                    labelName={transactionTypeLabel}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[12px] w-full">
                <label className="font-[600] text-[16px] leading-[24px] text-primary">
                  Transaction Status
                </label>
                <div className="flex items-center w-full">
                  <MultiSelectDropdown
                    options={statusOptions}
                    labelName={transactionStatusLabel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-end flex-grow  w-full ">
          <div className="flex gap-[12px] w-full pb-5 px-6 ">
            <button className="w-[50%] h-[48px] border border-[#EFF1F6] bg-white py-[12px] px-6 rounded-[100px] flex justify-center items-center font-[600] text-[16px] leading-[24px] text-center cursor-pointer">
              Clear
            </button>
            <button className="w-[50%] h-[48px] border  bg-primary py-[12px] px-6 rounded-[100px] flex justify-center items-center font-[600] text-[16px] leading-[24px] text-center text-white  cursor-pointer">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
