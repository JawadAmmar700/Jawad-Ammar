import React from "react"
import { GetStaticProps, GetStaticPaths } from "next"
import prisma from "../lib/prisma"
import { ProjectType } from "../lib/types"
import { CodeIcon, PlayIcon, GlobeAltIcon } from "@heroicons/react/outline"
import { ChevronLeftIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { motion } from "framer-motion"

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await prisma.data.findMany()

  const paths = projects.map(project => ({
    params: { name: project.name },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const param = ctx.params?.name
  const projects = await prisma.data.findMany()
  const specificProject = projects.find(project => project.name === param)

  return {
    props: { specificProject: JSON.stringify(specificProject) },
  }
}

const Details = ({ specificProject }: { specificProject: string }) => {
  const data: ProjectType = JSON.parse(specificProject)
  return (
    <div className="w-full min-h-screen md:relative flex flex-col md:flex-none space-y-2 items-center justify-center">
      <img
        src={data.src}
        alt={data.name}
        className="w-full md:h-screen h-[200px]  object-contain z-10 rounded-lg opacity-90 md:opacity-20"
      />
      <div className="w-full md:w-[600px] text-white flex flex-col space-y-3 justify-center z-30 md:absolute md:top-24 opacity-100">
        <Link href="/#Showcase">
          <motion.div
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1 }}
            className="fixed top-2 left-5 text-blue-500 flex justify-center items-center hover:text-blue-600 cursor-pointer group"
          >
            <ChevronLeftIcon className="w-[20px] group-hover:animate-pulse" />
            <p className="font-medium text-sm">Home</p>
          </motion.div>
        </Link>
        <p className="text-2xl font-bold mx-auto mb-4">{data.name}</p>

        <p className="text-sm font-medium mx-auto w-[400px] md:w-auto text-left break-words">
          Libraries: {data.technology}
        </p>

        <p className="first-letter:text-3xl text-sm font-medium text-left md:h-[150px] h-[110px]  break-words w-[400px] mx-auto  md:w-auto overflow-y-scroll hide-scroll-bar cursor-all-scroll">
          {data.description}
        </p>

        <div className="flex space-x-2  items-center justify-center">
          <motion.a
            whileHover={{
              scale: [1, 1.2, 1],
              rotate: [0, -15, 15, 0],
            }}
            href={data.link}
            target="_blank"
            className="border-2 font-bold h-[50px]  border-white rounded flex space-x-3 w-[150px] items-center justify-center group"
          >
            <p> Code</p>
            <CodeIcon className="w-[30px] group-hover:animate-pulse" />
          </motion.a>
          <motion.a
            whileHover={{
              scale: [1, 1.2, 1],
              rotate: [0, -15, 15, 0],
            }}
            href={data.videoUrl}
            target="_blank"
            className="border-2 text-black bg-white font-bold h-[50px] hover:bg-black hover:text-white border-white rounded flex space-x-3 w-[150px] items-center justify-center group"
          >
            <p>Watch</p>
            <PlayIcon className="w-[30px]  group-hover:animate-spin" />
          </motion.a>
        </div>
        {data?.site && (
          <motion.a
            whileHover={{
              scale: [1, 1.2, 1],
              rotate: [0, -15, 15, 0],
              backgroundColor: "black",
              color: "white",
            }}
            href={data.site}
            target="_blank"
            className="bg-black font-bold h-[50px] border-2 border-white mx-auto rounded flex space-x-3 w-[150px] items-center justify-center group"
          >
            <p> Site</p>
            <GlobeAltIcon className="w-[30px] group-hover:animate-spin " />
          </motion.a>
        )}
      </div>
    </div>
  )
}

export default Details
