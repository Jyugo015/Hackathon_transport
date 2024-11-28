import Image from "next/image";
import { FaCar, FaBus } from "react-icons/fa";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="min-h-screen bg-blue-100">
      {/* 背景部分 */}
      <section className="w-full h-64">
        {/* <Image
          src="/road.png"
          alt="Road"
          width={1600}
          height={100}
          style={{ objectFit: "cover" }}
        /> */}
        {/* <div className="absolute inset-20 flex place-items-start justify-center">
          <h2 className="mt-20 text-white text-3xl font-bold bg-black bg-opacity-50 p-4 rounded-md">
            When in doubt, just Grabbit and go!
          </h2>
        </div> */}
      </section>
      {/* 卡片部分 */}
      <div className="bg-blue-100 p-0">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grabbit Ride 卡片 */}
          <div className="bg-white p-6 rounded-md shadow-md hover:scale-105 transition ease-in-out delay-150">
            <FaCar className="text-blue-400 w-12 h-12 mx-auto" />
            <h3 className="font-bold text-xl mt-4">GRABBIT RIDE</h3>
            <p className="text-gray-600 mt-2">
              Fast, reliable, and affordable – your perfect ride is just a click
              away!
            </p>
            <Link href="/grabbit_ride">
              <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                Choose Ride
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md hover:scale-105 transition ease-in-out delay-150">
            <FaBus className="text-blue-400 w-12 h-12 mx-auto" />
            <h3 className="font-bold text-xl mt-4">BusScout</h3>
            <p className="text-gray-600 mt-2">
              On the go? So are we! Check your bus location and schedule
              instantly.
            </p>
            <Link href="/busum">
              <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                View Buses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
