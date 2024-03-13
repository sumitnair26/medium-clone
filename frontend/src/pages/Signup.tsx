import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return <div>
                <div className="grid grid-cols-2">
                    <div>
                        <Auth />
                    </div>
                    <div ClassName="visible lg:invisible">
                        <Quote />
                    </div>
                </div>
            </div>

}