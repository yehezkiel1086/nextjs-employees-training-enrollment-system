import { TrainingsTable } from "@/components/TrainingsTable"

const EnrolledTrainings = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Enrolled Trainings</h1>
      <p>List of all of your enrolled training programs</p>
      <TrainingsTable />
    </div>
  )
}

export default EnrolledTrainings
