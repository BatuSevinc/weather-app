
const City = ({ name, no,onClickCity }) => {

  const handleClick = () => {
    onClickCity(name)
  }

  return (
    <div
      className="flex items-center p-2 mt-4 mx-4 bg-white text-[#cf1f37] border-2 rounded-full group hover:bg-[#cf1f37] hover:text-white duration-300 cursor-pointer"
      onClick={(handleClick)}
    >
      <span className="w-12 h-12 bg-[#cf1f37] text-white font-semibold font-inter flex items-center justify-center rounded-full text-xl group-hover:bg-white group-hover:text-[#cf1f37]">
        {no}
      </span>
      <p className="flex-1 text-center text-lg font-medium">{name}</p>
    </div>
  );
};

export default City;