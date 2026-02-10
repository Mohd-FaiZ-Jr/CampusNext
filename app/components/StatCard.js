const StatCard = ({ icon, value, title, description }) => {
    return (
        <div
            className="
        bg-white
        border border-gray-200
        rounded-2xl
        p-8
        text-center
        shadow-[0_10px_30px_rgba(0,0,0,0.06)]
        hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]
        transition
      "
        >
            <div className="mx-auto mb-5 w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {icon}
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {value}
            </h3>

            <p className="text-sm font-semibold text-gray-700 mb-2">
                {title}
            </p>

            <p className="text-sm text-gray-500 leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default StatCard;
