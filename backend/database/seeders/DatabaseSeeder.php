<?php

namespace Database\Seeders;

use App\Http\Controllers\PaymenetTrancheController;
use App\Models\AbsenceReport;
use App\Models\Admin;
use App\Models\Blog;
use App\Models\ClassRoom;
use App\Models\Course;
use App\Models\Exam;
use App\Models\Grade;
use App\Models\Group;
use App\Models\GroupSubject;
use App\Models\Message;
use App\Models\PaymenetTranche;
use App\Models\PreRegistration;
use App\Models\Registration;
use App\Models\Speciality;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Database\Factories\BlogFactory;
use Database\Factories\GroupFactory;
use Faker\Provider\ar_EG\Payment;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {        
        $classroom_types = ["sciences", "sport", "normale", "musique", "art", "langue", "informatique", "histoire"];
        $specialities = [
            ["science economie", "eco"],
            ["science physique", "pc"],
            ["science svt", "svt"],
            ["sience littéraire", "lit"]
        ];
        $subjects = ["mathématiques", "physique et chimie", "arabe", "français", "anglais", "espagnol", "histoire", "géographie", "biologie", "éducation civique", "musique", "philosophie", "informatique", "économie", "sociologie", "psychologie", "théâtre", "sport", "religions",
        ];

        User::factory()->create([
            "email" => "password@password.com",
            "password" => "password@password.com",
        ]);
        
        // pre_reistrations table
        PreRegistration::factory(50)->create();
        
        // stundents table
        Student::factory(300)->create();
        
        Student::factory()->create([
            "email" => "student@student.com",
            "password" => Hash::make("student@student.com"),
        ]);
        
        // class_rooms table
        for ($i = 1; $i < 100; $i++) {
            ClassRoom::factory()->create([
                'classroom_number' => $i,
                'classroom_type' => $classroom_types[array_rand($classroom_types)]
            ]);
        }
        
        // admins table
        Admin::factory(5)->create();
        Admin::factory()->create([
            "email" => "admin@admin.com", 
            "password" => Hash::make("admin@admin.com"),
        ]);

        // blogs table
        Blog::factory(15)->create([
            "admin_id" => random_int(1, Admin::all()->count()),
        ]);

        // sepcialities table
        foreach($specialities as $speciality) {
            Speciality::factory()->create([
                "name" => $speciality[0],
                "code" => $speciality[1],
                "updated_at" => now(),
                "created_at" => now()
            ]);
        }

        // groups table
        Group::factory(15)->create([
            "speciality_id" => random_int(1, Speciality::all()->count()),
        ]);

        // registrations table
        Registration::factory(200)->create([
            'school_year' => 2024,
            'student_id' => random_int(1, Student::all()->count()),
            'group_id' => random_int(1, Group::all()->count()),
            'created_by' => random_int(1, Admin::all()->count()),
        ]);

        // subjects table
        foreach($subjects as $subject) {
            Subject::factory()->create([
                "name" => $subject,
            ]);
        }

        // teachers table
        Teacher::factory(50)->create();
        Teacher::factory()->create([
            "email" => "teacher@teacher.com",
            "password" => Hash::make("teacher@teacher.com"),
        ]);

        // group_subjects table
        GroupSubject::factory(20)->create([
            'teacher_id' => random_int(1, Teacher::all()->count()),
            'group_id' => random_int(1, Group::all()->count()),
            'subject_id' => random_int(1, Subject::all()->count()),
        ]);

        // courses table
        Course::factory(50)->create([
            'group_subject_id' => random_int(1, GroupSubject::all()->count()),
            'class_room_id' => random_int(1, ClassRoom::all()->count()),
        ]);

        // absensereports table
        AbsenceReport::factory(200)->create([
            'student_id' => random_int(1, Student::all()->count()),
            'course_id' => random_int(1, Course::all()->count()),
        ]);

        // payement_tranches table
        PaymenetTranche::factory(40)->create([
            'registration_id' => random_int(1, Registration::all()->count()),
        ]);

        // exams table
        Exam::factory(10)->create([
            "group_subject_id" => random_int(1, GroupSubject::all()->count()),
        ]);

        //students table
        Grade::factory(100)->create([
            'exam_id' => random_int(1, Exam::all()->count()),
            'student_id' => random_int(1, Student::all()->count()),
        ]);

        //messages table
        Message::factory(10)->create();
    }
}
