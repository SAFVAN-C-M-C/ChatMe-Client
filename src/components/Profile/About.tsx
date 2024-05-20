import { Icon } from '@iconify/react'


const About = () => {
  return (
    <>
    <div className="profile-about border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl bg-slate-50 mt-12">
            <div className="title w-full m-4 pr-6 flex justify-between">
              <div className="about-title">
                <span className="font-bold">About</span>
              </div>
              <div className="edit-about ">
                <Icon
                  className="cursor-pointer"
                  icon="mdi:edit"
                  width={26}
                  height={26}
                />
              </div>
            </div>
            <div className="about-content w-full p-3 h-auto">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                veniam corrupti a itaque aliquid, ratione animi numquam enim
                perferendis? Facere libero tempore nulla quibusdam. Ipsam
                obcaecati a soluta voluptas quas! Accusantium at necessitatibus
                animi aspernatur sint officiis ducimus repellat mollitia modi
                possimus! Porro saepe id consequatur non nobis enim, dolor
                tenetur odit exercitationem possimus magnam aliquid harum fugit
                ducimus iure. Ipsa quisquam perspiciatis nihil eveniet amet nam
                esse rem harum, accusamus, sint quibusdam. Accusantium illum,
                dolorem esse rerum quisquam optio aspernatur sapiente quae sequi
                expedita voluptatum incidunt omnis. Dicta, iusto?
              </p>
            </div>
          </div>
    </>
  )
}

export default About