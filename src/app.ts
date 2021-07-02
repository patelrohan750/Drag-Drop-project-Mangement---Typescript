enum projectStatus {
    Active,
    Finished
}

class Project {
    constructor(public id: number, public title: string, public description: string, public people: number, public status: projectStatus) { }
}
// const project=new Project(11,"title","decrption",20,projectStatus.Active);
// console.log(project)
class ProjectInput {
    formElement: HTMLFormElement
    titleElement: HTMLInputElement
    descElement: HTMLInputElement
    peopleElement: HTMLInputElement


    constructor() {
        this.formElement = document.querySelector('form') as HTMLFormElement;
        this.titleElement = document.querySelector('#title') as HTMLInputElement;
        this.descElement = document.querySelector('#desc') as HTMLInputElement;
        this.peopleElement = document.querySelector('#people') as HTMLInputElement;

        this.getInputData()
    }
    private getInputData() {
        this.formElement.addEventListener('submit', this.submitHandler.bind(this))
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        let title = this.titleElement.value
        let desc = this.descElement.value
        let people = +this.peopleElement.value //here we use + operator to convert string to number
        if (title || desc || people) {
            if (people > 0 && people <= 20) {
                const projectstate = new projectState;
                projectstate.addProjects(title, desc, people)
                console.log(title, desc, people)
                this.clearFormsData()
            }

        }

    }
    private clearFormsData() {
        this.titleElement.value = ""
        this.descElement.value = ""
        this.peopleElement.value = ""
    }
}

class projectState {


    private projects: Project[] = [];


    constructor() {
    }

    addProjects(title: string, decrption: string, people: number) {

        const project = new Project(Math.random(), title, decrption, people, projectStatus.Active);

        console.log(project)
        this.projects.push(project)
        console.log("projects....")
        console.log(this.projects)
        const projectList = new ProjectList();
        projectList.renderProjects(this.projects)


    }
}


class ProjectList {
    divElement: HTMLDivElement
    listElement: any
    // script:any
    constructor() {
        // this.script= document.querySelectorAll(".projects_list")!;
        this.listElement = document.querySelectorAll('.projects_list')!
        this.divElement = document.createElement('div');
        console.log("projectList class constructor called")



    }
    configure(divelement: HTMLDivElement) {
        console.log(divelement)
        console.log("script")
        console.log(this.listElement)
        divelement.addEventListener('dragstart', (e:any)=>{
            console.log("dragstart triggred....")
            divelement.classList.add('dragging')
           
        })
        divelement.addEventListener('dragend', (e:any)=>{
            console.log("dragend triggred....")
            divelement.classList.remove('dragging')
          
        })
        for (let lists of this.listElement) {

            lists.addEventListener('dragover', (e: any) => {
                e.preventDefault();
                console.log("dragover triggred....")
            })
            lists.addEventListener('dragenter', () => {
                console.log("dragenter triggred....")
            })
            lists.addEventListener('dragleave', () => {
                console.log("dragleave triggred....")
            })

            lists.addEventListener('drop', (e: any) => {
                console.log(this)
                console.log("drop triggred....")
                const draggable=document.querySelector('.dragging')
                e.target.append(draggable)
            })
        }

    }
  

    renderProjects(projects: Project[]) {

        console.log("isnide renderProjects...")

      
        projects.map(project => {

            let card = this.createCard(project.title, project.description, project.people)

            console.log(card)
            this.listElement[0].appendChild(card)

        })




    }
    createCard(title: string, desc: string, people: number) {

        this.divElement.classList.add('card', "col-md-3", "mr10", "mb-3");
        this.divElement.setAttribute('draggable', 'true')
        const insideDivElement = document.createElement('div');
        insideDivElement.classList.add('card-body');
        const h5Element = document.createElement('h5');
        h5Element.classList.add('card-title');
        h5Element.innerHTML = title;
        const pElement = document.createElement('p');
        pElement.classList.add('card-text');
        pElement.innerHTML = desc;
        const secondpElement = document.createElement('p');
        secondpElement.classList.add('card-text');
        secondpElement.innerHTML += people + " person";
        insideDivElement.appendChild(h5Element)
        insideDivElement.appendChild(pElement)
        insideDivElement.appendChild(secondpElement)
        this.divElement.appendChild(insideDivElement);
        this.configure(this.divElement);
        return this.divElement


    }
}
const pr = new ProjectInput();
