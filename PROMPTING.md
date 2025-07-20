# Prompting

Initially I decided to prompt my own definition of the application:

```
Create a web application with a mobile-first design that helps to track my GYM exercise or workout plan. Per day, week and monthly. Every day I should be able to see my training scheduled by my instructor like a todo list of every exercise in my routine. When I click/tap on an exercise a new page should be opened to see the exercise in detail including: a video or picture of the exercise, a title, a brief description of the exercise, and then the amount of rounds and weight/quantity I should do. At the bottom I should have two buttons: one to confirm the exercise execution at the right (confirm button) and one to dismiss the exercise at the left (dismiss button). When I click the confirm button, the exercise should be marked as "done" and then the next exercise of the day should be displayed. When I click the dismiss button, the exercise should be marked as "uncompleted" and then the next exercise of the day should be displayed. If there is no more exercises to do, a success / congratulations page should be displayed with a button to back to home (day/week/month view).

Loads the content (exercises) from a JSON, create the JSON file in a data folder of the application, define the schema based on the requirements of the application.
```

Then, I decide to improve it using [MejoraTuPrompt.com](https://mejoratuprompt.com/) and I receive quickly the following prompt:

```
Desarrolla una aplicación web con diseño mobile-first para el seguimiento de planes de entrenamiento de gimnasio. Debe permitir la visualización diaria, semanal y mensual. Cada día, se mostrará un listado tipo "to-do" de los ejercicios programados por mi instructor. Al seleccionar un ejercicio, se abrirá una nueva página con: vídeo o imagen, título, descripción breve, número de rondas y peso/cantidad. En la parte inferior, dos botones: uno a la derecha ("Confirmar") para marcar el ejercicio como completado, y otro a la izquierda ("Descartar") para marcarlo como incompleto. Al pulsar "Confirmar" o "Descartar", se mostrará el siguiente ejercicio. Si no hay más ejercicios, se mostrará una página de éxito con un botón para volver a la vista principal (día/semana/mes).

La aplicación cargará los datos de los ejercicios desde un archivo JSON ubicado en una carpeta "data" de la aplicación. Crea este archivo JSON con un esquema que responda a las necesidades de la aplicación, incluyendo al menos: nombre del ejercicio, descripción, imagen o vídeo (URL), número de rondas, peso/cantidad, y un campo para indicar si está completado (booleano). Considera la implementación de un sistema de fechas para la gestión del plan de entrenamiento a lo largo del tiempo (semanal y mensual) y la posibilidad de añadir nuevos ejercicios o modificar los existentes desde la propia aplicación, aunque esta funcionalidad no es obligatoria en esta primera entrega. Prioriza la claridad y la usabilidad en la interfaz de usuario.
```

Finally, I use ChatGPT with GPT-4o model to improve my prompt using the following:

```
Translate this prompt to english, generate a summary of suggested improvements. This is an application I want to build using vibe coding.
Give me a new prompt based on my input and suggestions to vibe code the application. Give me the prompt in a single structure/output to copy/paste into my vibecode application.

Desarrolla una aplicación web con diseño mobile-first para el seguimiento de planes de entrenamiento de gimnasio. Debe permitir la visualización diaria, semanal y mensual. Cada día, se mostrará un listado tipo "to-do" de los ejercicios programados por mi instructor. Al seleccionar un ejercicio, se abrirá una nueva página con: vídeo o imagen, título, descripción breve, número de rondas y peso/cantidad. En la parte inferior, dos botones: uno a la derecha ("Confirmar") para marcar el ejercicio como completado, y otro a la izquierda ("Descartar") para marcarlo como incompleto. Al pulsar "Confirmar" o "Descartar", se mostrará el siguiente ejercicio. Si no hay más ejercicios, se mostrará una página de éxito con un botón para volver a la vista principal (día/semana/mes).

La aplicación cargará los datos de los ejercicios desde un archivo JSON ubicado en una carpeta "data" de la aplicación. Crea este archivo JSON con un esquema que responda a las necesidades de la aplicación, incluyendo al menos: nombre del ejercicio, descripción, imagen o vídeo (URL), número de rondas, peso/cantidad, y un campo para indicar si está completado (booleano). Considera la implementación de un sistema de fechas para la gestión del plan de entrenamiento a lo largo del tiempo (semanal y mensual) y la posibilidad de añadir nuevos ejercicios o modificar los existentes desde la propia aplicación, aunque esta funcionalidad no es obligatoria en esta primera entrega. Prioriza la claridad y la usabilidad en la interfaz de usuario.
```

And I receive the final prompt:

```
🎯 Project Goal:
Build a **mobile-first web app** for tracking gym workout plans, focused on clarity and usability. The app should support daily, weekly, and monthly views of scheduled exercises, loaded from a JSON file.

🧱 Features (MVP):
1. **Calendar View** with tabs or navigation for:
   - Daily
   - Weekly
   - Monthly

2. **Daily Exercise To-Do List**:
   - Render a list of exercises for the selected date.
   - Each exercise includes:
     - ✅ Title
     - 📄 Short description
     - 🎬 Image or video (URL)
     - 🔁 Number of rounds
     - ⚖️ Weight or quantity

3. **Exercise Detail View**:
   - Opens when selecting an exercise.
   - Two buttons at the bottom:
     - "Confirm" → marks as completed and advances
     - "Discard" → marks as skipped and advances
   - If no exercises remain: show a **success screen** with a "Back to View" button.

4. **Data Source**:
   - Load workouts from `/data/workouts.json`
   - JSON schema should include:
     ```json
     {
       "date": "YYYY-MM-DD",
       "exercises": [
         {
           "name": "string",
           "description": "string",
           "mediaUrl": "string",
           "rounds": number,
           "quantity": "string",
           "weight": "string",
           "completed": boolean
         }
       ]
     }
     ```

💡 Stretch Goals (optional):
- Add/edit exercises from the UI.
- Persist completion status with localStorage.
- Navigation shortcuts for next/previous days.

🛠 Suggested Tech Stack:
- Framework: React or Next.js
- Styling: TailwindCSS
- State: useState/useContext or Zustand
- Data: Static JSON file (`/data/workouts.json`)
- Routing: Client-side navigation with dynamic detail views

🔄 Workflow:
- Use component-based dev (CalendarView, ExerciseList, ExerciseDetail, CompletionScreen)
- Push small PRs or screen slices often
- Share working demos at each step (calendar, list view, detail interaction, etc.)

🎯 Focus:
Clarity, UX-first mobile design, fast iteration. Start with mock data and static views before adding logic. Let’s build!
```
